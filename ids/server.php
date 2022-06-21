<?php
$val = $_GET["data"];
$fileContent=$val."\n";
$filename = "datastorage.txt";
$fileStatus=file_put_contents($filename,$fileContent,FILE_APPEND);
if($fileStatus != false)
{
	echo  "SUCCESS. Data written in file.";
	$file = file($filename);
	$dataCount = count($file);
	for ($i = 0; $i < $dataCount-10; $i++) {
		unset($file[$i]);
	}
  	file_put_contents($filename, $file);
}
else
{
	echo  "FAIL. Could not connect to file.";
}
