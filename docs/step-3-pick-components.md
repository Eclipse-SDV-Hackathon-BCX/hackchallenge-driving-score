# Hack Challenge "Driving Score"
## Step 3 - Identify the needed components

Vehicle software components usually use middleware to communicate with each other. There are plenty of middleware tools available, depending on the use case, type of data or type of deployment.

You can work with well-known network protocols, such as gRPC, MQTT, HTTPS, or with some more sophisticated automotive protocols, such as Some/IP or DDS.

After identifying the software projects you want to use, identify which protocols they support and how they fit to each other. Read the documentation of the projects, many have good tutorials and example code.

## Example List of components

This list of components is based on the example architecture and data flow. If you have a different architecture, you may need other components.

- [Eclipse Kuksa.VAL Data Broker](https://github.com/eclipse/kuksa.val/tree/master/kuksa_databroker) for storing and brokering vehicle data between in-vehicle apps and services
- Use [Eclipse Kuksa.VAL DBC Feeder](https://github.com/eclipse/kuksa.val.feeders/tree/main/dbc2val) for simulating vehicle data from pre-recorded or live CAN-Bus
  - Alternatively, you can use [this docker container](https://github.com/mikehaller/kuksa.val.services-carsim/pkgs/container/carsim) to simulate Vehicle.Speed and Vehicle.Acceleration and [this docker container](https://github.com/mikehaller/kuksa.val.services-carsim/pkgs/container/driver) to simulate a very simple human driver (eg Vehicle.Chassis.Accelerator.PedalPosition)
- Chose a programming language for your "pre-processing" component, which transforms the raw data (eg Vehicle.Speed) into something of lower sampling frequency (eg. acceleration is delta v over delta t and then take the average of the acceleration over a moving-window of the last 5 data points). Push the acceleration into the Kuksa Data Broker as the structured value "Vehicle.Acceleration" with its attribute "long, lat, vertical".
- [Eclipse Velocitas](https://github.com/eclipse-velocitas) as toolchain and framework for implementing the driving score business logic. Use the [template repositories](https://github.com/orgs/eclipse-velocitas/repositories?q=template&type=all&language=&sort=) as a quick starting guide. There's also a [tutorial](https://websites.eclipseprojects.io/velocitas/docs/tutorials/).
- Use Docker to build, package and deploy your app to a container registry.
- A container registry, eg GitHub packages, Docker Hub, canister.io or https://ttl.sh/
- [Eclipse Leda](https://github.com/eclipse-leda/leda-distro) quickstart images on the provided SD-Cards during the hackathon for your target devices.

## Example List of components (ROS)

TODO: ROS/Muto/Kuksa/Ditto



Next: [Step 4: Implement the driving score vehicle app](./step-4-driving-score-app.md)
