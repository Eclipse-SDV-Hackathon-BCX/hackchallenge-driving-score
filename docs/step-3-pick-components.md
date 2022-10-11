# Hack Challenge "Driving Score"
## Step 3 - Identify the needed components

Vehicle software components usually use middleware to communicate with each other. There are plenty of middleware tools available, depending on the use case, type of data or type of deployment. You can work with well-known network protocols, such as gRPC, MQTT, HTTPS, or with some more sophisticated automotive protocols, such as Some/IP, Eclipse eCAL or DDS. After identifying the software projects you want to use, identify which protocols they support and how they fit to each other. Read the documentation of the projects, many have good tutorials and example code.

## Example List of components

This list of components is based on the example architecture and data flow. If you have a different architecture, you may need other components.

- Use Eclipse Kuksa Data Broker for storing abd brokering vehicle data between in-vehicle apps and services
- Use Eclipse Kuksa DBC Feeder for simulating vehicle data
- Implement a "Preprocess Data" component, which transforms the raw data (eg Vehicle.Speed) into something of lower sampling frequency (eg. acceleration is delta v over delta t and then take the average of the acceleration over a moving-window of the last 5 data points). Push the acceleration into the Kuksa Data Broker as the structured value "Vehicle.Acceleration" with its attribute "long, lat, vertical".
- Use Eclipse Velocitas as framework for implementing the driving score business logic. Use the template repository as a quick starting guide.
- Use Docker to build, package and deploy your app to a container registry.
- A container registry, eg GitHub packages, Docker Hub, canister.io or https://ttl.sh/
- Use Eclipse Leda Quickstart Image on the provided SD-Cards during the hackathon for your target devices.
