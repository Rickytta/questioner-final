class Validate {
  static name(input) {
    if (input.match(/[a-z]{2}/i) && !input.match(/[!$%*|}{:><?~`_&#^=]/)) {
      return true;
    }
    return false;
  }

  static phone(input) {
    if (input.match(/[0-9+]{2}/i) && !input.match(/[!$%*|}{:><?~`_&#^=]/)) {
      return true;
    }
    return false;
  }

  static email(input) {
    if (input.match(/\S+@\S+\.\S+/i)) {
      return true;
    }
    return false;
  }

  static title(input) {
    if (input.match(/[a-z0-9]{2}/i) && !input.match(/[|}{~`^=]/)) {
      return true;
    }
    return false;
  }
}

export default Validate;