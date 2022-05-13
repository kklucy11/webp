import Password from './password'
import UserName from './username'
import Button from './button'
import './index.css'
const Page = () => {
    return (<div className='app'>
        <h1 className='login'>CGU Login</h1>
        <UserName />
        <Password />
        <Button />
    </div>);
}
export default Page