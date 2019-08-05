#!/bin/bash
list=$(ls *.pdf)
for i in $list
	do
	echo $i
	temp=$(echo $i | tr -d '.pdf')
	./pdftotext -lineprinter $i >> $temp'.txt'
	rm $i
	done