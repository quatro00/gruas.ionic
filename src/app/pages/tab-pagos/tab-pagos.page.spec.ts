import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TabPagosPage } from './tab-pagos.page';

describe('TabPagosPage', () => {
  let component: TabPagosPage;
  let fixture: ComponentFixture<TabPagosPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(TabPagosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
