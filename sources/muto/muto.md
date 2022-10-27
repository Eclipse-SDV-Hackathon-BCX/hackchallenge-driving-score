# Muto Files

## Quick Start
docker run --rm \
-v $(pwd)/launch:/home/muto/launch \
-v $(pwd)/mike.yaml:/home/muto/launch/config/muto.yaml \
composiv/muto:latest \
/bin/bash -c "source devel/setup.bash && roslaunch launch/muto.launch"
