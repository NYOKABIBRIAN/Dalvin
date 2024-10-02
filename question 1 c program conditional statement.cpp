// conditional statement (if,if...else,else)

#include <stdio.h>
int main() {
	int age =21;
	int income =21000;
	   // take input from user
	   printf ("please input your age:\n");
	   scanf("%d",&age);
	   printf("please input your income:\n");
	   scanf ("%d",&income);
	   //give answer according to the conditional statements
	   if (age>21 , income > 21000){
		   printf("congratulations you qualify for a loan\n");
	   }
	  
	   else if (age<21 ,income <21000){
		   printf ("Unfortunately, we are unable to offer you a loan at this time\n");
	   }
	    
}