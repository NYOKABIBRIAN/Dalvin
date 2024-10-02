//program to find compound interest
//A=a*(1+r/n)^t*n
//a=principal amount
//r=rate of interest
//n=percantage
//t=time in years

#include <iostream>
using namespace std;
int main()
{
     //declare some variable
	 int a,r,n,t;
	 float A;
	 //take input from user
	 cout<<"enter principal amount :-";
	 cin>>a;
	 cout<<"enter rate of interest :-";
	 cin>>r;
	 cout<<"enter the percantage :-";
	 cin>>n;
	 cout<<"enter time in years:-";
	 cin>>t;
	 //calculate the compound interest according to the formular given below
	 A=(a*(1+r/n)^t*n);
	 
}
