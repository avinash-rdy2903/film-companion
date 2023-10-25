import * as Location from 'expo-location';
export default async function getLocationPermission(){
  const hasPermission = await Location.requestForegroundPermissionsAsync();
  if (hasPermission.status !== "granted") {
    return false;
  }
  return true;
};