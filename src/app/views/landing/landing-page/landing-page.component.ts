import { Component } from '@angular/core';
import { SharedModule } from '../../../shared/shared.module';
import { TranslatePipe } from '../../../core/pipes/translate.pipe';
import { LanguageSwitcherComponent } from "../../../core/shared/language-switcher.component";
import { ThemeToggleComponent } from "../../../core/shared/theme-toggle.component";
import { CarouselModule } from 'primeng/carousel';
import { TranslateStateService } from '../../../core/services/translate-state.service';

@Component({
  selector: 'app-landing-page',
  imports: [SharedModule, TranslatePipe, CarouselModule, LanguageSwitcherComponent, ThemeToggleComponent],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.scss'
})
export class LandingPageComponent {
  theme: 'dark' | 'light' = (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) ? 'light' : 'dark';

  dir = 'ltr'
  constructor(private translate: TranslateStateService) {
    translate.lang$.subscribe((result)=>{
      this.dir = translate.currentLang == 'ar' ? 'rtl' : 'ltr';
    })
  }
  
  responsiveOptions = [
    {
      breakpoint: '1400px',
      numVisible: 3,
      numScroll: 1
    },
    {
      breakpoint: '1199px',
      numVisible: 2,
      numScroll: 1
    },
    {
      breakpoint: '768px',
      numVisible: 1,
      numScroll: 1,
      touch: false
    },
    {
      breakpoint: '480px',
      numVisible: 1,
      numScroll: 1
    }
  ];

  links = [
    { label: 'HOME', href: '#home' },
    { label: 'ABOUT', href: '#about' },
    { label: 'SERVICES', href: '#services' },
    { label: 'STATISTICS', href: '#statistics' },
    { label: 'FEATURES', href: '#features' },
    { label: 'CONTACT', href: '#footer' }
  ];

  statistics = [
    {
      number: '1100',
      plus: '+',
      title: 'STUDENTS_ENROLLED',
      description: 'STUDENTS_ENROLLED_DESC'
    },
    {
      number: '50',
      plus: '+',
      title: 'SPECIALISTS',
      description: 'SPECIALISTS_DESC'
    },
    {
      number: '100',
      plus: '%',
      title: 'SATISFACTION_RATE',
      description: 'SATISFACTION_RATE_DESC'
    }
  ];

  coreValues = [
    {
      icon: 'fa-graduation-cap',
      title: 'ACADEMIC_EXCELLENCE',
      description: 'ACADEMIC_EXCELLENCE_DESC'
    },
    {
      icon: 'fa-lock',
      title: 'CONFIDENTIALITY',
      description: 'CONFIDENTIALITY_DESC'
    },
    {
      icon: 'fa-globe',
      title: 'GLOBAL_REACH',
      description: 'GLOBAL_REACH_DESC'
    },
    // {
    //   icon: 'fa-users',
    //   title: 'EXPERT_TEAM',
    //   description: 'EXPERT_TEAM_DESC'
    // }
  ];

  features = [
    {
      id: 1,
      title: 'CONFIDENTIAL_CONVERSATIONS',
      description: 'CONFIDENTIAL_CONVERSATIONS_DESC',
      image: 'assets/images/feature1.jpg'
    },
    {
      id: 2,
      title: 'EXPERT_REQUEST',
      description: 'EXPERT_REQUEST_DESC',
      image: 'assets/images/feature2.jpg'
    },
    {
      id: 3,
      title: 'PROFESSIONAL_COURSES',
      description: 'PROFESSIONAL_COURSES_DESC',
      image: 'assets/images/feature3.jpg'
    },
    {
      id: 4,
      title: 'SKILL_DEVELOPMENT',
      description: 'SKILL_DEVELOPMENT_DESC',
      image: 'assets/images/feature4.jpg'
    },
    {
      id: 5,
      title: 'SMART_NOTIFICATIONS',
      description: 'SMART_NOTIFICATIONS_DESC',
      image: 'assets/images/feature5.jpg'
    }
  ];

  services = [
    {
      icon: 'fa-book',
      title: 'PRIVATE_TUTORING',
      description: 'PRIVATE_TUTORING_DESC'
    },
    {
      icon: 'fa-search',
      title: 'RESEARCH_PAPERS',
      description: 'RESEARCH_PAPERS_DESC'
    },
    {
      icon: 'fa-project-diagram',
      title: 'GRADUATION_PROJECTS',
      description: 'GRADUATION_PROJECTS_DESC'
    },
    {
      icon: 'fa-scroll',
      title: 'MASTERS_THESIS',
      description: 'MASTERS_THESIS_DESC'
    },
    {
      icon: 'fa-user-graduate',
      title: 'PHD_DISSERTATION',
      description: 'PHD_DISSERTATION_DESC'
    },
    {
      icon: 'fa-file-alt',
      title: 'SCIENTIFIC_ARTICLES',
      description: 'SCIENTIFIC_ARTICLES_DESC'
    }
  ];
}