#!/usr/bin/env python

import rospy
import kuksa_client
from ackermann_msgs.msg import AckermannDriveStamped



def cmd_callback(msg):
  
  global client
  

  '''
  msg = AckermannDriveStamped()
  msg.header.stamp = rospy.Time.now()
  msg.header.frame_id = frame_id
  msg.drive.steering_angle = steering
  msg.drive.speed = v
  msg.drive.acceleration = accel
  msg.drive.jerk = jerk
  '''
  client.setValue('Vehicle.CurrentLocation.Timestamp', msg.header.stamp, timeout=1)
  
  # Convert to KPH (Float)
  client.setValue('Vehicle.Speed',  msg.drive.speed, timeout=1)
  # Convert to ANGLE (INT)
  client.setValue('Vehicle.Chassis.SteeringWheel.Angle',  int(msg.drive.steering_angle*57.2957), timeout=1)
  

if __name__ == '__main__': 
  try:
    
    rospy.init_node('ackermann_2_kuksa')
        
    ackermann_topic = rospy.get_param('~ackermann_topic', '/drive')
    kuksa_ip = rospy.get_param('~kuksa_ip', '_CHANGE_TO_WHERE_YOUR_BROKER_IS_')
    kuksa_port = rospy.get_param('~kuksa_port', 8090)
    kuksa_protocol = rospy.get_param('~kuksa_protocol', 'grpc')
    rospy.loginfo("Node 'ackermann_2_kuksa' started.\nConnecting to to {}:{}".format(kuksa_ip, kuksa_port))

    client = kuksa_client.KuksaClientThread({"ip": kuksa_ip, "port": kuksa_port, "protocol": kuksa_protocol, "insecure": True})
    client.start()
    
    rospy.Subscriber(ackermann_topic, AckermannDriveStamped, cmd_callback, queue_size=1)
    
    rospy.loginfo("Node 'ackermann_2_kuksa' started.\nPublishing to to %s", kuksa_ip)
    
    rospy.spin()
    client.stop()
    
  except rospy.ROSInterruptException:
    client.stop()
    pass

