# Hack Challenge "Driving Score"
## Step 2 - Design the architecture and data flow

For a vehicle app to be able to calculate something, you need a **place to store and retrieve the vehicle data**. Instead of using raw CAN frames, use hardware abstraction layers to make your app easier to implement, test and deploy.

Consider using [Eclipse Kuksa.VAL Data Broker](https://github.com/eclipse/kuksa.val/tree/master/kuksa_databroker) as the Vehicle Data storage on the device. Also consider that vehicle signals have a high sampling frequency, eg usually in the milliseconds range. Thereas a higher level logic only needs data with a lower sampling frequency. **Plan a pre-processing step** into the lower layer of your data flow before sending it to the data broker to get rid of unnecessary details.

Another factor to consider is that your app is supposed to be deployed to a non-realtime compute domain. In a real system, it would be running next to another domain, the safety domain where a real-time capable operating system is running embedded services. If you want to explore this architecture, consider using the Xen hypervisor to deploy [Eclipse Leda](https://github.com/eclipse-leda/leda-distro) and [ROS](https://www.ros.org/) on the same physical device, as separated guests. This is more advanced and takes more time to set up, but let's you also explore the system integration aspects of a more realistic zone-oriented vehicle E/E architecture. A good source of information is [SOAFEE.io](https://soafee.io/)

## Example Architecture

The example architecture shows a basic setup and a more advanced setup (dotted red areas). This documentation only describes the basic setup and your team is free to explore the advanced setup.

![](../assets/driving-score-architecture.drawio.png)

## Example Data Flow

The overall dataflow could like like the following (from bottom to top):
- A driver controlling the vehicle (eg accelerator pedal position)
- A vehicle producing telemetry data (eg vehicle speed)
- A pre-processing step in the embedded layer (filtering, crunching, ...)
- The data broker for storing current values
- The vehicle app to calculate the driving style score for a single vehicle
- The cloud to visualize the scores for a fleet of cars

![](../assets/driving-score-dataflow.drawio.png)

- References: [MDPI Whitepaper](https://www.mdpi.com/2079-9292/8/9/943/htm)


## Example Data Flow (ROS)

TODO:


## Hints

- Think of the physical vehicle (chassis, motor, powertrain etc.) as a black box system for this hackathon. Accelerator position is an input into the vehicle, same goes for position of the steering wheel.
- The physical telemetry sensor in the vehicle can either produce the "Vehicle Speed" scalar value, or the "Vehicle Acceleration" vector, depending on the type of simulation tool you're using.
- VSS + Kuksa can manage structured values as well. `Vehicle.Acceleration` is a vector with the attributes `lateral`, `longitudinal`, `vertical`. However, if you continue with the pre-recorded CAN dump file, it only contains a scalar for `Vehicle.Speed`, so you need to calculate and store the acceleration on your own. Other simulation tools produce acceleration telemetry already.
- Implementing your own simulation: The math can become quiet complex. Try to [start simple](https://de.mathworks.com/help/driving/ref/bicyclemodel.html?s_tid=doc_ta) first and then iterate for fine tuning and detailing out your ideas. Don't get lost in complex [Vehicle Dynamics](https://www.mathworks.com/help/ident/ug/modeling-a-vehicle-dynamics-system.html).

Next: [Step 3: Pick Components](./step-3-pick-components.md)
