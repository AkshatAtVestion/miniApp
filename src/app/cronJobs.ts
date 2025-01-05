//import cron from 'node-cron';
// import fetch from 'node-fetch';

// const API_URL = 'http://localhost:3000/api/update-prices'; // Replace with your actual API route

// export function startCronJob() {
//     // Schedule the task to run every 24 hours at midnight
//     cron.schedule('0 0 * * *', async () => {
//         console.log(`[${new Date().toISOString()}] Starting scheduled task to update cryptocurrency prices...`);

//         try {
//             const response = await fetch(API_URL, { method: 'POST' });
//             const data = await response.json();
//             console.log(`[${new Date().toISOString()}] Task completed successfully:`, data);
//         } catch (error: any) {
//             console.error(`[${new Date().toISOString()}] Error executing the task:`, error.message);
//         }
//     });

//     console.log('Cron job has been scheduled to run every 24 hours.');
// }
