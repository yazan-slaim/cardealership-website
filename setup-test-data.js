const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://yazanslaim:WTLs7IetcdcImzi4@cluster0.rzcwm5w.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
  .then(async () => {
    const dealership = await mongoose.connection.collection('dealerships').findOne();
    if (dealership) {
      await mongoose.connection.collection('dealerships').updateOne(
        { _id: dealership._id },
        { $set: { businessType: 'rental', rentalConfig: { currency: 'USD', depositPercent: 20 } } }
      );
      console.log('Updated Dealership ID:', dealership._id.toString());
      console.log('Domain:', dealership.subdomain || dealership.customDomain);
      
      // Also create a sample fleet vehicle
      const fleetRes = await mongoose.connection.collection('fleets').insertOne({
        dealershipId: dealership._id,
        title: 'Toyota Camry 2024',
        carMake: 'Toyota',
        model: 'Camry',
        year: 2024,
        bodyType: 'Sedan',
        transmission: 'Automatic',
        fuel: 'Hybrid',
        seats: 5,
        dailyRate: 45,
        weeklyRate: 280,
        monthlyRate: 1100,
        isActive: true,
        status: 'available',
        Featured: true,
        images: ['https://www.topgear.com/sites/default/files/2023/11/1-Toyota-Camry.jpg']
      });
      console.log('Created Fleet ID:', fleetRes.insertedId.toString());
    } else {
      console.log('No dealerships exist at all');
    }
    mongoose.disconnect();
  });
