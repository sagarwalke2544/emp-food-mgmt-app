import { Component, OnInit } from '@angular/core';
import { EmployeeManagementService } from '../employee-management.service';

@Component({
  selector: 'app-emp-food-mgmt',
  templateUrl: './emp-food-mgmt.component.html',
  styleUrls: ['./emp-food-mgmt.component.css']
})
export class EmpFoodMgmtComponent implements OnInit {
  employeeData: any;
  fines: number = 0;
  month: any = 11;

  constructor(private employeeManagementService: EmployeeManagementService) {}

  ngOnInit(): void {
    this.submit();
  }
  
  submit() {
    let data:any = {
      month: this.month
    }
    this.fetchFoodOrderDetails(data);
  }

  fetchFoodOrderDetails(month: any): void {
    this.employeeManagementService.getFoodOrderDetails(month).subscribe((data:any) => {
      this.employeeData = data;
      this.calculateFines();
    });
  }

  calculateFines(): void {
    this.fines = 0;

    this.employeeData.reports.forEach((report: any) => {
      Object.keys(report.opt_ins).forEach((meal: string) => {
        if (report.opt_ins[meal] === 'Pending') {
          this.fines += 100;
        }
      });
    });
  }

  getMealStatus(report: any, meal: string): string {
    return report.opt_ins && report.opt_ins[meal] ? report.opt_ins[meal] : 'No Order';
  }

  isFineApplicable(report: any, meal: string): boolean {
    return report.opt_ins && report.opt_ins[meal] === 'Pending';
  }

  calculateFineForDay(report: any): number {
    let fineForDay = 0;
  
    ['breakfast', 'lunch', 'dinner'].forEach(meal => {
      if (this.isFineApplicable(report, meal)) {
        fineForDay += 100;
      }
    });
  
    return fineForDay;
  }

  isPending(mealStatus: string): boolean {
    return mealStatus === 'Pending';
  }

  hasPendingMeals(report: any): boolean {
    return ['breakfast', 'lunch', 'dinner'].some(meal => this.isFineApplicable(report, meal));
  }
}

