# Hack Challenge "Driving Score"
## Step 5 - Build and deploy to a device

 Once you've got your stack up and running on your development environment or within the IDE, you may want to deploy the package and run your app on a real device, such as a Raspberry Pi. You may even need to connect multiple devices to your system. Each may play a different role in the overall architecture. Does your team have all the hardware necessary? A Raspberry Pi with network connection is minimum, but you also want to set up a system with multiple devices (Laptops, Raspberries etc) playing different roles, such as the Vehicle simulator, the Vehicle Compute Unit, the Infotainment Unit. Before deploying though, you need to build and package your applications and dependencies. Remember to plan for cross-compilation to the target CPU of your device.

## Hints

- Build your app. The example GitHub Actions workflow in the Velocitas example is a good start.
- Don't forgot to include the runtime dependencies and also cross-compile your app for arm64 before deploying to a Raspberry.
- Package it as an OCI Container. You may want to use multiarch containers.
- Push the container image to a (public, free) container registry
- Write a k8s deployment/pod spec and put it into `/data/server/manifests/` on the Eclipse Leda quickstart image, or apply it with `kubectl apply -f pod.yml`
- On Eclipse Leda, you can use https://k9scli.io/ to manage the containers, watch log files etc.