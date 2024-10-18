// c functions
#include <stdio.h> //scanf(),printf()
#include <math.h> //cos(),tan(),sin(),sqrt()
int sum (int x,int y,int z);//function prototype
int multiplication(int a,int b);//function prototype

int main(int argc, char** argv)
{
	int x,y,z,a,b,c;
	printf("enter 3 values");
	scanf("%d%d%d",&a,&b,&c);
	x=sum(a,b,c);//function calling
	z=sum(100,200,300);//function calling
	y=multiplication(a,c);//function calling
	
	printf("the sum is %d\n",x);
	printf("the 2nd sum is %d\n",z);
	printf("the multi is %d\n",y);
	return 0;
}

//function defination
int sum(int x, int y,int z){
	int result;
	result=x+y+z;
	return result;
}
// function defination
int multiplication(int a,int b){
	int result;
	result=a*b;
	return result;
}