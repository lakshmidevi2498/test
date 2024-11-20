import notificationSchema from '../models/notificationModel.js'
import webPush from 'web-push';

export const notificationPostController = async (req,res) => {
    try {
        const {subscription} = req.body;
        if (!subscription.endpoint || !subscription.keys || !subscription.keys.p256dh || !subscription.keys.auth) {
          return res.status(400).json({ 
            success: false, 
            message: "Invalid subscription data." 
          });
        }


        console.log(" req.body",subscription)
        let existingSubscription = await notificationSchema.findOne({ endpoint: subscription.endpoint });
  
      if (existingSubscription) {
        existingSubscription.expirationTime = subscription.expirationTime;
        existingSubscription.keys = subscription.keys;
  
        await existingSubscription.save();
  
        res.status(200).json({ 
          // message: 'Subscription updated successfully!' 
        });  
      } else {
        const newSubscription = new notificationSchema(subscription);
        await newSubscription.save();
  
        res.status(201).json({ success: true, 
          // message: 'Subscription saved successfully.' 
        }); 
      }
        
    } catch (error) {
        console.log("error",error)
        res.status(500).json(
          // {message:"Server error"}
        )
        
    }
}

export const sendNotificationController = async (req,res) => {
    const { title, body } = req.body.body;
    console.log("reqbody",req.body.body)
  
    if (!title || !body) {
      return res.status(400).json({ success: false, message: 'Title and body are required' });
    }
  
    try {
      const subscriptions = await notificationSchema.find();
      console.log("Subscriptions fetched from DB:", subscriptions);
  
      if (subscriptions.length === 0) {
        return res.status(400).json({ success: false, message: 'No subscriptions found' });
      }
  
      const payload = JSON.stringify({
        title: title,
        body: body,
        icon: '/path-to-your-icon.png'
      });
  
      let successCount = 0;
      let failureCount = 0;
  
 
      for (const subscription of subscriptions) {
        try {
          await webPush.sendNotification(subscription, payload, );
          
          successCount++;
        } catch (error) {
          console.error('Error sending notification to:', subscription, error);
          failureCount++;
        }
      }
  
      console.log(`Notifications sent successfully: ${successCount}, failed: ${failureCount}`);
  
      res.status(200).json({
        // message: 'Notification processing completed.',
        successCount: successCount,
        failureCount: failureCount
      });
  
    } catch (error) {
      console.error('Error fetching subscriptions or sending notifications:', error);
      res.status(500).json({
        success: false,
        message: 'Error sending notifications.',
        error: error.message
      });
    }
}