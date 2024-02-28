import { cartActions } from './cart-slice';
import { uiActions } from './ui-slice';

export const fetchCartData = () =>{
return async(dispatch) =>{
    const fetchData = async ()=>{
        const response = await fetch('https://react-firebase-9a59a-default-rtdb.firebaseio.com/cart.json');
        if(!response.ok){
            throw new Error('Could not fetch cart data!');
        }
        const data = await response.json();
        return data;
    };
    try{
const cartData = await fetchData();
console.log("data is fetching");
dispatch(cartActions.replaceCart(cartData))
    }catch(error){
        console.log("error is fetching");
        dispatch(uiActions.showNotification({
                  status:'error',
                  title:'Error',
                  message:"Sending Cart failed "
                }))
    }
}
}

export const sendCartData = (cart)=> {
    return async (dispatch)=> {

        dispatch(uiActions.showNotification({
            status:'pending',
            title:'Sending',
            message:"Sending Cart data"
          }));

           const sendRequest= async()=>{
            const response = await fetch('https://react-firebase-9a59a-default-rtdb.firebaseio.com/cart.json',{
                method:'PUT',
                body: JSON.stringify({
                    items: cart.items,
                    quantity: cart.totalQuantity
                })
              });
              
              if(!response.ok){
                throw new Error('sending error');
              }
           }
           try{
            await sendRequest();
            dispatch(uiActions.showNotification({
                status:'success',
                title:'Sent',
                message:"Cart Sent !!!"
              }));
           } catch (error){
          
                dispatch(uiActions.showNotification({
                  status:'error',
                  title:'Error',
                  message:"Sending Cart failed "
                }))
              }
           
            }
    

 }