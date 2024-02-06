
require('dotenv').config()
const account_sid=process.env.TWILIO_ACCOUNT_SID;
    const auth_token=process.env.TWILIO_AUTH_TOKEN;
    const client =require('twilio')(account_sid,auth_token);

module.exports = {

    signup:  async(req,res)=>{
        try{
            console.log(req.body);
            const phoneNumber=req.body.mobileNumber;
            console.log('mele');
        
            await client.verify.v2.services(process.env.TWILIO_SERVICE_SID).verifications.create({to:`+91 ${phoneNumber}`,channel:`sms`}).then((res)=>{
                console.log('--------------------res--------------');
                console.log(res);
                console.log('--------------------res--------------');
            })
            .catch((err)=>{
                console.log('--------------------err--------------');
                console.log(err);
                console.log('--------------------err--------------');
            })
            res.json({message:'OTP send successfully'});
            
            }
    
        catch (error) {
            res.status(500).json({error:'failed to send OTP'});
    
        }
    
    
    
    
    }
}


