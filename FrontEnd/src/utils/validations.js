export const isValid = (regex, value) => new RegExp(regex).test(value);

export const validations = {
  register: {
    user: {
      email: {
        regex:
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        message: 'Invalid email.',
      },
      password: {
        regex: /[a-zA-Z0-9]{5,12}/,
        message: 'Invalid password.',
      },
      userType: {
        regex: /.+/,
        message: 'User type is required.',
      },
    },
  },
};
