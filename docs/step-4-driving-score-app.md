# Hack Challenge "Driving Score"
## Step 4 - Implement the driving score vehicle app

 You certainly identified some gaps, where you need to adapt or transform data or commands from one protocol to another. Also the business logic, the vehicle app, needs to be implemented. Eclipse Velocitas has a python template github repository and a tutorial in the documentation.

## Hints

- Use the [Eclipse Velocitas Python Template](https://github.com/eclipse-velocitas/vehicle-app-python-template)
- Subscribe to the `Vehicle.Speed` data points
- Additionally to the datapoint value (`Vehicle.Speed.get()`), you probably also need the `timestamp` attribute for proper calculation of the acceleration.
- Calculate the jerk
    
        jerk = abs(da(t) over dt)
    
    See https://en.wikipedia.org/wiki/Jerk_(physics) to find out more about the physics.
- Find the peaks in the jerk. You may want to use [SciPy](https://docs.scipy.org/doc/scipy/reference/generated/scipy.signal.find_peaks.html)
- Count the number of peaks > 0.6 m/s³. A higher number is considered a bumpy ride (or bad driving style), a lower number is acceptable as a smooth ride.
- The score is then calculated based on the number of peaks over a specific time window
- Feel free to add additional input data to your algorithm later, such as how fast the steering wheel is rotated. Start simple.