# Hack Challenge "Driving Score"
## Step 1 - Identify needed input signals

The [Vehicle Signal Specification](https://github.com/COVESA/vehicle_signal_specification) is supported by [Eclipse Velocitas](https://github.com/eclipse-velocitas) and [Eclipse Kuksa.VAL Databroker](https://github.com/eclipse/kuksa.val). The [Kuksa.VAL DBC Feeder](https://github.com/eclipse/kuksa.val.feeders) has an example recording of raw vehicle signals in the form of a [recorded CAN-Bus network session log](https://github.com/eclipse/kuksa.val.feeders/blob/main/dbc2val/candump.log) file, including the mapping to a specific vehicle model.

It's the easiest way to get simulated data. It's a static recording and will run in a loop though, you won't be able to influence the simulation. However, all of these components can be run in a docker container, which makes it easy and convenient to use - and even run on a headless edge device with a container runtime. In a later step, if you have more time, check out some other vehicle simulators such as [CARLA](https://carla.readthedocs.io/) or [F1Tenth](https://f1tenth.readthedocs.io/en/stable/), maybe you can integrate these as well. 

## Vehicle Signals

On [digital.auto](http://digital.auto), you will find a [playground](https://www.digitalplaybook.org/index.php?title=Overview:_playground.digital.auto) for SDV-related use cases and a catalogue of vehicle signals. The [beta app](https://digitalauto.netlify.app/) contains a CVI catalog of the latest COVESA VSS release and helps you identify standardized vehicle signals:

![](../assets/digitalauto-cvi-catalog.png)

Example vehicle signals which may be useful for calculating a driving score:
- Vehicle.Speed
- Vehicle.AverageSpeed
- Vehicle.Acceleration
- Vehicle.Chassis.Axle.Row1.WheelDiameter
- Vehicle.Chassis.SteeringWheel.Angle
- Vehicle.Powertrain.Transmission.CurrentGear


Let's continue with `Vehicle.Speed` as an example.

## Run a pre-recorded simulation

We'll be using Eclipse Kuksa's DBC Feeder to read some pre-recorded data and feed it into the data broker, so that we can see how te data looks like.

1. Run [Eclipse Kuksa.VAL Data Broker](https://github.com/eclipse/kuksa.val/tree/master/kuksa_databroker):

        docker run --rm -it -p 55555:55555/tcp ghcr.io/eclipse/kuksa.val/databroker:master

2. Run the Eclipse Kuksa.VAL DBC2VAL Feeder
    
        git clone https://github.com/eclipse/kuksa.val.feeders
        cd kuksa.val.feeders/dbc2val
        python3 ./dbcfeeder.py

    *Hint:* You may need to fix the dbcfeeder.py to allow truncated values, as there is a [known issue](https://github.com/eclipse/kuksa.val/issues/374)

    You can now see which vehicle signals are found in the recorded data file.

    ![](../assets/kuksa-dbc-speed.png)

3. Run the databroker-cli

        git clone https://github.com/eclipse/kuksa.val
        cd kuksa.val/kuksa_databroker
        cargo run --bin databroker-cli

    Type `get veh&lt;tab&gt;sp&lt;tab&gt;`, which will expand to `get Vehicle.Speed`

    ![](../assets/kuksa-databroker-cli.png)

    Use `subscribe SELECT Vehicle.Speed WHERE Vehicle.Speed > 0` you would get continuous updates.

In your application, you will access the Eclipse Kuksa Data Broker by its gRPC interface instead of the databroker-cli tool.

Next: [Step 2: Architecture and Data Flow](./step-2-architecture-data-flow.md)
