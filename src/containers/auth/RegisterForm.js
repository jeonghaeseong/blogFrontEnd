import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changeField, initializeForm, register } from '../../modules/auth';
import AuthForm from '../../components/auth/AuthForm';
import { check } from '../../modules/user';
import { withRouter } from 'react-router-dom';

const RegisterForm = ({history}) => {

    console.log('RegisterForm', history);

    const dispatch = useDispatch();
    const { form, auth, authError, user } = useSelector(({ auth, user }) => ({
        form: auth.register,
        auth: auth.auth,
        authError: auth.authError,
        user: user.user,
    }));

    const onChange = e => {
        const { value, name } = e.target;
        dispatch(
            changeField({
                form: 'register',
                key: name,
                value
            })
        );
    };

    const onSubmit = e => {
        e.preventDefault();

        const { username, password, passwordConfirm } = form;
        
        if(password !== passwordConfirm) {
            // TODO: 오류 처리
            return;
        }

        dispatch(register({ username, password }));
    };

    useEffect(() => {

        if(authError) {
            console.log('오류 발생');
            console.log(authError);
            return;
        }

        if(auth) {
            console.log('회원가입 성공');
            console.log(auth);
            dispatch(check());
        }

        dispatch(initializeForm('register'));
    }, [auth, authError, dispatch]);

    useEffect(() => {
        if(user) {
            history.push('/');
        }
    }, [history, user]);

    return (
        <AuthForm
            type="register"
            form={form}
            onChange={onChange}
            onSubmit={onSubmit}
        />
    );
};

export default withRouter(RegisterForm);