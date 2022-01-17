const dayjs = require('dayjs');
const { Op } = require('sequelize');

const message = require('../../../utils/messages');
const authConstant = require('../../../constants/authConstant');    

function makeAuthController ({
  authService,makeUniqueValidation,userService,userAuthSettingService,userTokenService,makeUser,roleService,userRoleService
}){
  const register = async ({ data }) => {
    try {
      data = {
        ...data,
        role: authConstant.USER_ROLE.User
      };
      let isEmptyPassword = false;
      if (!data.password){
        isEmptyPassword = true;
        data.password = Math.random().toString(36).slice(2);
      }
      const user = makeUser(data, 'insertUserValidator');
      let unique = await makeUniqueValidation.uniqueValidation(user);
      if (!unique){
        return message.inValidParam({ message : 'User Registration Failed, Duplicate data found' });
      }
      const result = await userService.createOne(user);
      if (isEmptyPassword && data.email && data.mobileNo){
        await authService.sendPasswordBySMS({
          mobileNo: data.mobileNo,
          password: data.password
        });
        await authService.sendPasswordByEmail({
          email: data.email,
          password: data.password
        });
      } else {
        if (isEmptyPassword && data.mobileNo){
          await authService.sendPasswordBySMS({
            mobileNo: data.mobileNo,
            password: data.password
          });
        }
        if (isEmptyPassword && data.email){
          await authService.sendPasswordByEmail({
            email: data.email,
            password: data.password
          });
        }
      }
      return message.successResponse({ data:result });
    }
    catch (error) {
      if (error.name === 'ValidationError'){
        return message.inValidParam({ message : error.message });
      }
      return message.failureResponse({ data:error.message });
    }
  };
  const forgotPassword = async (params) => {
    try {
      if (!params.email) {
        return message.insufficientParameters();
      }
      let where = { email: params.email };
      params.email = params.email.toString().toLowerCase();
      let user = await userService.findOne(where);
      if (user) {
        let {
          resultOfEmail, resultOfSMS 
        } = await authService.sendResetPasswordNotification(user);
        if (resultOfEmail && resultOfSMS) {
          return message.requestValidated({ message :'otp successfully send.' });
    
        } else if (resultOfEmail && !resultOfSMS) {
          return message.requestValidated({ message :'otp successfully send to your email.' });
    
        } else if (!resultOfEmail && resultOfSMS) {
          return message.requestValidated({ message :'otp successfully send to your mobile number.' });
        } else {
          return message.failureResponse({ data:error.message });
        }
      } else {
        return message.recordNotFound();
      }
    } catch (error) {
      return message.failureResponse({ data:error.message });
    }
  };
    
  const validateResetPasswordOtp = async (params) => {
    try {
      if (!params || !params.otp) {
        return message.insufficientParameters();
      }
      let user = await userAuthSettingService.findOne({ resetPasswordCode: params.otp });
      if (!user || !user.resetPasswordCode) {
        return message.invalidRequest({ message :'Invalid OTP' });
      }
      // link expire
      if (dayjs(new Date()).isAfter(dayjs(user.expiredTimeOfResetPasswordCode))) {
        return message.invalidRequest({ message :'Your reset password link is expired.' });
      }
      return message.requestValidated({ message :'OTP Validated' });
    } catch (error) {
      return message.failureResponse({ data:error.message });
    }
  };
    
  const resetPassword = async (params) => {
    try {
      if (!params.code || !params.newPassword) {
        return message.insufficientParameters();
      }
      let user = await userAuthSettingService.findOne({ resetPasswordCode: params.code });
      if (user && user.expiredTimeOfResetPasswordCode) {
        if (dayjs(new Date()).isAfter(dayjs(user.expiredTimeOfResetPasswordCode))) {// link expire
          return message.invalidRequest({ message:'Your reset password link is expired.' });
        }
      } else {
        // invalid Code
        return message.invalidRequest({ message :'Invalid Code' });
      }
      let response = await authService.resetPassword(user.userId, params.newPassword);
      if (response && !response.flag) {
        return message.requestValidated({ message :response.data });
      } 
      return message.invalidRequest({ message :response.data });
    } catch (error) {
      return message.failureResponse({ data:error.message });
    }
  };
  const authentication = async (data)=>{
    try {
      let username = data.body.username;
      let password = data.body.password;
      let url = data.url;
      if (username && password){
        let roleAccess = false;
        if (data.body.includeRoleAccess){
          roleAccess = data.body.includeRoleAccess;
        }
        let result = await authService.loginUser(username, password, url, roleAccess);
        if (!result.flag){
          return message.loginSuccess({ data:result.data });
        }
        return message.loginFailed({ message :result.data }); 
      }
      return message.insufficientParameters();
    } catch (error) {
      return message.failureResponse({ data:error.message });
    }
  };
  const logout = async (req) => {
    try {
      if (req.user) {
        let userTokens = await userTokenService.findOne({
          token: (req.headers.authorization).replace('Bearer ', ''),
          userId:req.user.id 
        });
        userTokens.isTokenExpired = true;
        let id = userTokens.id;
        delete userTokens.id;
        await userTokenService.updateByPk(id, userTokens.toJSON());
        return message.requestValidated({ message :'Logged out Successfully' });
      }
      return message.badRequest();
    } catch (error) {
      return message.failureResponse({ data:error.message });
    }
  };

  return Object.freeze({
    register,
    authentication,
    forgotPassword,
    resetPassword,
    validateResetPasswordOtp,
    logout,
  });
}

module.exports = makeAuthController;