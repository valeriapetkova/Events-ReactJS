export const formValidate = (name, value) => {
    const errors = {};
    value = value.trim();

    if (name === 'password' && (value.length < 5 || value === ' ')) {
        errors.password = 'Password should be at least 5 symbols.';
    }

    if (name === 'repeatPassword' && value === '') {
        errors.repeatPassword = 'Passwords do not match.';
    }

    if (name === 'username' && (value.length < 3 || value === '')) {
        errors.username = 'Username should be at least 3 symbols.';
    }

    if (name === 'email') {
        let pattern = /\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w+)+/g;

        let validEmail = pattern.test(value);

        if(!validEmail) {
            errors.email = 'Fill a valid email.';
        }
    }

    if (name === 'title' && (value.length > 30 || value === '')) {
        errors.title = 'Title should be max 30 characters long.';
    }

    if (name === 'description' && value === '') {
        errors.description = 'Please fill a description';
    }

    if (name === 'comment' && value === '') {
        errors.comment = 'Please fill this field';
    }

    return errors;
}