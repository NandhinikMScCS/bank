

export const mainMenus = [
    {
        label: 'Deposit',
        key:'deposit',
        path: '/deposit'
    },
    {
        label: 'Withdraw',
        key:'withdraw',
        path: '/withdraw'
    },
    {
        label: 'Summary',
        key:'summary',
        path: '/summary'
    }
]

export const createAccountInputs = [
    {
        label: 'Username',
        key: 'name',
        type: 'text',
    },
    {
        label: 'Email',
        key: 'email',
        type: 'email'

    },
    {
        label: 'Password',
        key: 'password',
        type: 'password'

    },
    {
        label: 'Confirm Password',
        key: 'confirmPassword',
        type: 'password'

    },
]
export const COLLECTIONS = {
    users:"Users"
}
export const validations = [{
    key:'name',
    type:'string',
    label:'Username'
},
{
    key:'email',
    type:'email',
    regExp: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
   label: 'Email'
},
{
    key:'password',
    length:8,
    type:'password',
   label: 'Password'
},

]