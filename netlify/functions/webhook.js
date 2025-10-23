const fs = require('fs');
const path = require('path');

const subscribersPath = path.join(process.cwd(), 'subscribers.json');

exports.handler = async function(event, context) {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'الطريقة غير مسموحة' })
    };
  }

  try {
    const IPN_SECRET = process.env.NOWPAYMENTS_IPN_SECRET;
    const payload = JSON.parse(event.body);
    
    if (payload.payment_status === 'finished' || payload.payment_status === 'confirmed') {
      const email = payload.customer_email || payload.email;
      
      if (!email) {
        return {
          statusCode: 400,
          body: JSON.stringify({ error: 'البريد الإلكتروني مطلوب' })
        };
      }

      let subscribers = [];
      if (fs.existsSync(subscribersPath)) {
        const data = fs.readFileSync(subscribersPath, 'utf8');
        subscribers = JSON.parse(data);
      }

      const existingSubscriber = subscribers.find(sub => sub.email === email);
      
      if (existingSubscriber) {
        existingSubscriber.paid = true;
        existingSubscriber.updatedAt = new Date().toISOString();
      } else {
        subscribers.push({
          email: email,
          paid: true,
          subscriptionDate: new Date().toISOString(),
          paymentId: payload.payment_id
        });
      }

      fs.writeFileSync(subscribersPath, JSON.stringify(subscribers, null, 2));

      return {
        statusCode: 200,
        body: JSON.stringify({ 
          success: true, 
          message: `تم تحديث حالة الاشتراك للمستخدم ${email}` 
        })
      };
    } else {
      return {
        statusCode: 200,
        body: JSON.stringify({ 
          message: 'في انتظار اكتمال الدفع' 
        })
      };
    }
  } catch (error) {
    console.error('خطأ في معالجة Webhook:', error);
    
    return {
      statusCode: 500,
      body: JSON.stringify({ 
        error: 'حدث خطأ أثناء معالجة الطلب' 
      })
    };
  }
};
