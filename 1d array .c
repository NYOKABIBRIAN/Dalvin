//  1d array
#include <stdio.h>
int main(int argc, char** argv)
{
	int i;
	int marks [5]={50,60,30,20,40};
	for(i=0;i<5;i++){
		printf("marks[%d]=%d\n",i,marks[i]);
	}
	return 0;
}