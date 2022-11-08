- Check `/data/server/manifests/kuksa-carsim.yaml` and remove "tcp://" prefixes from both lines for the DATABROKER_ADDRESS environment variable:
```
    ### CHANGE THIS:
    env:
      - name: DATABROKER_ADDRESS
        value: vehicledatabroker-nodeport:55555

    ### TO THIS:
    env:
      - name: DATABROKER_ADDRESS
        value: vehicledatabroker-nodeport:55555
```
- Change /data/server/manifests/muto.yaml to use the following image: `composiv/muto-demo:arm64v8-noetic-ros-base-focal`

```
    containers:
        - name: muto
          image: composiv/muto-demo:arm64v8-noetic-ros-base-focal
          command: ["/bin/bash", "-c", "'source devel/setup.bash && roslaunch launch/muto.launch'"]
```

- Change /data/server/manifests/muto.yaml and remove the single quotes from the `command`:

```
    ### CHANGE THIS:
    command: ["/bin/bash", "-c", "'source devel/setup.bash && roslaunch launch/muto.launch'"]
    
    ### TO THIS:
    command: ["/bin/bash", "-c", "source devel/setup.bash && roslaunch launch/muto.launch"]
```

- Edit /data/server/manifests/muto-config.yaml and change device name at the bottom to the hostname of your device (or use your team name)

```
       # TODO: edit the name below
        name: leda-XXXX
```

After the changes, redeploy:
```
kubectl apply -f /data/server/manifests/kuksa-carsis.yaml
kubectl apply -f /data/server/manifests/muto-config.yaml
kubectl apply -f /data/server/manifests/muto.yaml
```
