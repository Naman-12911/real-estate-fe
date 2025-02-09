

import { Capacitor } from '@capacitor/core';
import { Filesystem, Directory } from '@capacitor/filesystem';
import { toast } from 'sonner';
import { baseURL } from '../../Constant';
import Axios from '../../Axios';
import { FileOpener } from '@capacitor-community/file-opener';
import write_blob from 'capacitor-blob-writer';
import axios from 'axios';

const requestFilesystemPermissions = async () => {
  const permissions = await Filesystem.requestPermissions();
  return permissions.publicStorage === 'granted';
};


const downloadWordExcel = async (apiUrl, fileName,accessToken,info,successDevice,successWebsite,errorToast = {}) => {
	// const accessToken=useSelector((state)=>state.user.user);
	toast.info(info);
  try {
    // Determine platform-specific behavior
    if (Capacitor.isNativePlatform()) {

      // Request necessary permissions
      const hasPermission = await requestFilesystemPermissions();
      if (!hasPermission) {
        toast.error('Storage permission not granted.');
        return;
      }

      const response = await axios.get(`${baseURL}${apiUrl}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        responseType: 'blob',
      });
      console.log(response);
      const blob = new Blob([response.data], { type: response.headers['content-type'] });
      console.log(blob)
      await write_blob({
        path: `/${fileName}`,
        blob: blob,
        directory: Directory.Documents
      });

      const uri = await Filesystem.getUri({
        directory: Directory.Documents,
        path: `/${fileName}`
      });

      FileOpener.open({
        filePath: uri.uri,
        contentType: blob.type,
      }).then(() => {
        console.log('File is opened');
        toast.success(successDevice);
      }).catch((error) => {
        console.error('Error opening file:', error);
        toast.error('Failed to open file.');
      });

	  toast.success(successDevice);
    } else {
     // Web logic
     const response = await Axios.get(apiUrl, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      responseType: 'blob',
    });

    const url = window.URL.createObjectURL(new Blob([response.data]));
    const a = document.createElement('a');
    a.href = url;
    a.download = `${fileName}`; // Specify the filename you want
    document.body.appendChild(a); // Append the anchor to the body
    a.click(); // Trigger the download
    a.remove(); // Remove the anchor from the body

    // Optional: Revoke the object URL after a certain period to free up memory
    setTimeout(() => window.URL.revokeObjectURL(url), 100);
  toast.success(successWebsite);
  }
} catch (error) {
  console.error('Error downloading file:', error);
  // toast.error(errorToast);
  // Handle error as needed
  if (error.response && error.response.data) {
    try {
      // Attempt to convert the blob to text
      const errorText = await error.response.data.text();

      // Try to parse the error message as JSON
      const errorMessage = JSON.parse(errorText);

      // Display the error message from the response
      toast.error(errorMessage.message || errorToast);
    } catch (e) {
      // If parsing fails, show the raw error text
      toast.error(errorToast);
    }
  } else {
    // Handle other types of errors (e.g., network errors)
    toast.error("An error occurred while downloading the file.");
  }

}
};

export default downloadWordExcel;
