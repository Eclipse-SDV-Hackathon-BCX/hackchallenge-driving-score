#!/usr/bin/env python

import rospy
import json

from std_msgs.msg import String, Int32MultiArray
import muto_msgs.msg as muto_msgs
import muto_msgs.srv as muto_srv
from ackermann_msgs.msg import AckermannDriveStamped


def handle_remotecontrol(req):
  payload = json.loads(req.input.payload)
  controlType = payload["control"]
  commandType = payload["type"]
  commandDirection = payload["direction"]

  if controlType == "keyboard" :
      msg = Int32MultiArray(data=[0,1,0,0,0,0])
      pubmux.publish(msg)

  if controlType == "navigator" :
      msg = Int32MultiArray(data=[0,0,0,0,1,0])
      pubmux.publish(msg)

  if controlType == "joystick":
      x = payload["x"]/100.0
      y = payload["y"]/100.0

      desired_velocity = 7 * y
      desired_steer = -0.4189 * x
      publish_to_drive(desired_velocity, desired_steer)

  if controlType == "reset" :
      msg = Int32MultiArray(data=[0,0,0,0,0,0])
      pubmux.publish(msg)

  if controlType == "keyboard" and commandType == "move" :
      if commandDirection == "FORWARD" :
        msg = String(data="w")
      if commandDirection == "BACKWARD" :
        msg = String(data="s")
      if commandDirection == "LEFT" :
        msg = String(data="a")
      if commandDirection == "RIGHT" :
        msg = String(data="s")
      pubkey.publish(msg)

  if  controlType == "keyboard" and commandType == "stop":
      msg = String(data=" ")
      pubkey.publish(msg)



  status = { "status": "control {} type {} direction {}".format(controlType, commandType, commandDirection) }
  response = muto_msgs.CommandOutput()
  response.payload = json.dumps(status)
  response.result = muto_msgs.PluginResponse(resultCode=0, errorMessage="", errorDescription="")
  print("response {}".format(response.payload))
  return response


def publish_to_drive(desired_velocity, desired_steer):
  msg = AckermannDriveStamped()
  msg.header.stamp = rospy.Time.now()
  msg.drive.steering_angle = desired_steer
  msg.drive.speed = desired_velocity
  drivepub.publish(msg);

   

if __name__ == '__main__': 
  try:
    
    rospy.init_node('bcx_commandplugin')
    bcx_remotecontrol = rospy.Service(
            "bcx_remotecontrol", muto_srv.CommandPlugin, handle_remotecontrol)
    pubkey = rospy.Publisher('/key', String, queue_size=1)
    pubmux = rospy.Publisher('/mux', Int32MultiArray, queue_size=1)
    drivepub = rospy.Publisher('/drive', AckermannDriveStamped, queue_size=10)
    rospy.spin()
    
  except rospy.ROSInterruptException:
    pass

