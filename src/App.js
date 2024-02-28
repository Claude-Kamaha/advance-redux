import { useDispatch, useSelector } from 'react-redux';
import Cart from './components/Cart/Cart';
import Layout from './components/Layout/Layout';
import Products from './components/Shop/Products';
import { useEffect } from 'react';
import { uiActions } from './store/ui-slice';
import Notification from './components/UI/Notification';
let isInitial = true;
function App() {
  const dispatch = useDispatch()
  const showCart = useSelector (state => state.ui.cartIsVisible);
  const cart = useSelector(state=> {
    console.log("this is the state of cart", state);
    return state.cart
  })
  const notification = useSelector(state => state.ui.notification)

  useEffect(()=>{
    const sendCartData = async()=>{
      dispatch(uiActions.showNotification({
        status:'pending',
        title:'Here is a notif',
        message:"Sending Cart data"
      }))
      const response = await fetch('https://react-firebase-9a59a-default-rtdb.firebaseio.com/cart.json',{
        method:'PUT',
        body: JSON.stringify(cart)
      });
      if(!response.ok){
        throw new Error('sending error');
      }
      // const responseData =  await response.json();
    }
    if(isInitial){
      isInitial = false;
      return ;
    }
  
    dispatch(uiActions.showNotification({
      status:'success',
      title:'Sent',
      message:"Cart Sent !!!"
    }))
    sendCartData().catch((error)=>{
      dispatch(uiActions.showNotification({
        status:'error',
        title:'Error',
        message:"Sending Cart failed "
      }))
    })
  }, [cart, dispatch])
  return (
    <>
    {notification && <Notification 
     status={notification.status} 
    title={notification.title}
     message={notification.message} />}
    <Layout>
      {showCart && <Cart />}
      
      <Products />
    </Layout>
    </>

  );
}

export default App;
