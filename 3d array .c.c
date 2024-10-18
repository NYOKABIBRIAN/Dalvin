//declare an array program
#include<stdio.h>
int main()
{
	int i,j,k;
 	int marks[2][2][3]={ {{60,80,30},{45,55,96}},{{56,36,99},{74,65,90} }};
	for(i=0;i<2;i++)
		for(j=0;j<3;j++)
		for(k=0;k<3;k++){	
		printf("marks[%d][%d][%d]=%d\n",i,j,k,marks[i][j][k]);
	}
	return 0;
}