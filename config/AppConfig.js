const RegEx = {
    email:/^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/,
    number:/^(\+{0,1}?[0-9]{1,3}\-{0,1}?\ {0,1}?)?[0-9]{9,11}$/,
    address:/^[a-zA-Z\s\d\/.#:\-;,'\\ ]+$/,
    name:/^[a-zA-Z ]+$/,
    city:/^[a-zA-Z . 0-9]+$/,
    mobileNumber:/^(\+{0,1}?[0-9]{1,3}\-{0,1}?\ {0,1}?)?[0-9]{9,11}$/,
    password:/^(?=.*?[A-Za-z0-9])(?=.*?[#?!@$%^&*-]).{9,}$/,
    numberFormat:/^[0-9 ]+$/,
    message:/^[a-zA-Z\s\d . -]+$/,
    couponCode:/^[A-Z0-9-]+$/
  };
  export {RegEx};