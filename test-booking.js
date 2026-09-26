fetch("http://localhost:3000/api/bookings", {
  method: "POST",
  headers: {
    "Content-Type": "application/json"
  },
  body: JSON.stringify({
    dealershipId: "6a163f3cccd77d9bd1ae0994",
    fleetId: "6a88873421b54d1b18a2b283",
    pickupDate: "2026-09-01",
    returnDate: "2026-09-10",
    rateType: "daily",
    extras: [{ name: "GPS Navigation", price: 3 }],
    firstName: "Jane",
    lastName: "Smith",
    email: "jane.smith.rental@example.com",
    phone: "+1987654321",
    driverLicenseNumber: "AB1234567",
    pickupLocation: "Airport",
    returnLocation: "Airport",
    notes: "Flight arrives at 10 AM"
  })
})
  .then(res => res.json())
  .then(data => console.log(JSON.stringify(data, null, 2)))
  .catch(err => console.error(err));
