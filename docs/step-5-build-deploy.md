# Hack Challenge "Driving Score"
## Step 5 - Build and deploy to a device

 Once you've got your stack up and running on your development environment or within the IDE, you may want to deploy the package and run your app on a real device, such as a Raspberry Pi.
 
 You may even need to connect **multiple devices** to your system. Each may play a different role in the overall architecture. Does your team have all the hardware necessary? A Raspberry Pi with network connection is minimum, but you also want to set up a system with multiple devices (Laptops, Raspberries etc) playing different roles, such as the Vehicle simulator, the Vehicle Compute Unit, the Infotainment Unit.
 
 Before deploying though, you need to **build and package your applications** and dependencies.
 
 Remember to **plan for cross-compilation** to the target CPU of your device.

## Hints

- Build your app. The example GitHub Actions workflow in the Velocitas example is a good start.
- Don't forgot to include the runtime dependencies and also cross-compile your app for arm64 before deploying to a Raspberry.
- Package it as an OCI Container. You may want to use multiarch containers.
- Push the container image to a container registry, e.g. GitHub Packages or https://ttl.sh

## Deployment on Eclipse Leda
- For the hackathon, you don't need a mobility cloud connection and a full OTA campaign rountrip, so we're going to use local deployments of apps and containers. Once the container image is pushed to a registry, it can be pulled by the container runtime onto the device.
- Write a [k8s Pod](https://kubernetes.io/docs/concepts/workloads/pods/) or [k8s Deployment](https://kubernetes.io/docs/concepts/workloads/controllers/deployment/) spec for your app and put it into `/data/server/manifests/` on the Eclipse Leda quickstart image, or apply it with `kubectl apply -f myapp.yml`
- On Eclipse Leda, you can use [k9s](https://k9scli.io/) to manage the containers, watch log files etc.


## Deployment on a JetRacer with Eclipse Muto
- For the hackathon, you can continue to use the simulator environment or deploy your system to one of the SDV Fleet testcars with muto. Follow the [instructions for running Eclipse Muto on the JetRacer](https://github.com/composiv/jetracer_example) or here [JetRacer Nano for the Hackathon](https://github.com/Eclipse-SDV-Hackathon-BCX/.github/blob/main/profile/JetRacer.md)

