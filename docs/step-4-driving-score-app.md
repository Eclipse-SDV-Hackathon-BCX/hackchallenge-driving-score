# Hack Challenge "Driving Score"
## Step 4 - Implement the driving score vehicle app

### What are you waiting for?
### Go find a hack team and start having fun at the hack challenge!

*If you need some hints, scroll down.*

![](../assets/happy-hacking.jpg)

<br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br>

## Hints for Driving Score calculation

- Use the [Eclipse Velocitas templates](https://github.com/orgs/eclipse-velocitas/repositories?q=template&type=all&language=&sort=)
- Use the [Eclipse Muto Node Template (Python)] to add an in-vehicle implementation of drive score node that subscribes to AckermannDrive message (TODO: Github code )
- Use the [Eclipse Muto LiveUI Template (React Javascript)] to add visualization widget of drive score for a racecar or the complete fleet to the dashbaord (TODO: Github code )
- Subscribe to the `Vehicle.Speed` data points. You may need the `timestamp` for proper calculation of the acceleration.
- The most complicated task is to calculate the jerk:
    
    $$ jerk = abs({da(t) \over dt})
    $$

- See [Jerk (physics)](https://en.wikipedia.org/wiki/Jerk_(physics)) to find out more about the physics and [Standards for passenger comfort in automated vehicles: Acceleration and jerk](https://www.sciencedirect.com/science/article/pii/S0003687022002046 )
- Find the peaks in the jerk. You may want to use [SciPy find_peaks()](https://docs.scipy.org/doc/scipy/reference/generated/scipy.signal.find_peaks.html)
- Count the number of peaks > 0.6 m/s³. A higher number is considered a bumpy ride (or bad driving style), a lower number is acceptable as a smooth ride (or good driving style).
- The score is then calculated based on the number of peaks over a specific time window
- Feel free to add additional input data to your algorithm later, such as how fast the steering wheel is rotated. Start simple.

Next: [Step 5: Build and deploy to a device](./step-5-build-deploy.md)

