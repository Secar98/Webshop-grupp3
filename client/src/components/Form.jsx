import FetchKit from '../utils/fetchKit';

export default function Form({_id,fullName,email,phoneNumber, deliveryAddress}) {

    const handleOnSubmit =  (e) =>{
        e.preventDefault()
        const newData ={
        fullName: e.target[0].value,
        email: e.target[1].value,
        phoneNumber: e.target[2].value,
        deliveryAddress: {
            postalCode: e.target[3].value,
            streetAddress: e.target[4].value,
            city: e.target[5].value,
      },
    };
        const token = localStorage.getItem('token')
        FetchKit.editFetch(newData,token,_id)
        .then((res) => res.json())
        .then(item =>{
            console.log(item)
        });
    }

    return (
        <div>
    <form method="POST" onSubmit={handleOnSubmit}>
        <input name="fullName" type="text" defaultValue={fullName}/>
        <input name="email" type="text" defaultValue={email} />
        <input name="phoneNumber" type="number" defaultValue={phoneNumber} />
        <input name="postalCode" type="number" defaultValue={deliveryAddress.postalCode}/>
        <input name="streetAddress" type="text" defaultValue={deliveryAddress.streetAddress} />
        <input name="city" type="text" defaultValue={deliveryAddress.city}/>
        <input type="submit" value="submit"/>
    </form>
</div>
    )
}
