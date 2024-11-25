import notificationSchema from '../models/notificationModel.js'
import webPush from 'web-push';

export const notificationPostController = async (req, res) => {
  try {
      const { subscription, token } = req.body;
      console.log("token in notificationPostController",token)

      // Check if subscription object has all required fields
      if (!subscription.endpoint || !subscription.keys || !subscription.keys.p256dh || !subscription.keys.auth) {
        return res.status(400).json({ 
          success: false, 
          message: "Invalid subscription data." 
        });
      }

      console.log("req.body", subscription, token);

      // Check if subscription already exists
      let existingSubscription = await notificationSchema.findOne({ endpoint: subscription.endpoint });

      if (existingSubscription) {
          // Update the existing subscription if found
          existingSubscription.expirationTime = subscription.expirationTime;
          existingSubscription.keys = subscription.keys;
          existingSubscription.token = token;

          await existingSubscription.save();
          console.log("existingSubscription",existingSubscription)

          res.status(200).json({
            success: true,
            message: 'Subscription updated successfully!',
          });  
      } else {
          // Add the token to the subscription object and create a new one
          const newSubscription = new notificationSchema({
              ...subscription,  
              token,            
          });

          await newSubscription.save();

          res.status(201).json({
            success: true,
            message: 'Subscription saved successfully.',
          });
      }
      
  } catch (error) {
      console.log("Error", error);
      res.status(500).json({
        success: false,
        message: 'Server error',
      });
  }
};


export const sendNotificationController = async (req, res) => {
  const { title, body } = req.body.body;
  const { token } = req.body; 
  console.log("req.body.body",req.body.body , "dfghj",req.body)

  if (!title || !body || !token) {
      return res.status(400).json({ success: false, message: 'Title, body, and token are required' });
  }

  try {
      const subscriptions = await notificationSchema.find({ token });
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
              await webPush.sendNotification(subscription, payload);
              successCount++;
          } catch (error) {
              console.error('Error sending notification to:', subscription, error);
              failureCount++;
          }
      }

      console.log(`Notifications sent successfully: ${successCount}, failed: ${failureCount}`);

      res.status(200).json({
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
};

 
