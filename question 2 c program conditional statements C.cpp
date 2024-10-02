//program to calculate the fine for overdue library books
//daysoverdue=returnDate-dueDate

#include <stdio.h>
#include<math.h>
int main(){
	int bookid;
	int dueDate;
	int returnDate;
	int fineAmount;
	float overdue=returnDate-dueDate;
	

	
	
	//take all input from user;
		printf("please input bookid :\n");
     scanf("%d",&bookid);
	
	printf("please input duedate:\n");
	scanf("%d",&dueDate);
	
	printf("please input returnDate:\n");
	scanf("%d",&returnDate);
	
	//calculate days overdue according to the formular below
	// display the overdue to be seen by user
	 overdue=returnDate-dueDate;
	 //calculate the fine rate using the formular below
	
	
	if( overdue <7 ){
		printf("fineAmount= sh.20");
	}
	 else if(overdue > 8 < 14 ){
		printf("fineAmount=sh.50");
	}
      else if(overdue >=15 ){
		printf("fineAmount=sh.100");
	}
	
  
	
	
	
}