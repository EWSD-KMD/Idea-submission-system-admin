export interface ReportChartResponse {
  data: {
    overview: Overview;
    departmentStats: DepartmentStat[];
    categoryStats: CategoryStat[];
    popularIdeas: PopularIdea[];
    browserStats: BrowserStat[];
  };
  err: number;
  message: string;
}

export interface Overview {
  totalIdeas: number;
  interactions: {
    likes: number;
    dislikes: number;
  };
  totalComments: number;
  activeUsers: number;
}

export interface DepartmentStat {
  name: string;
  totalPosts: number;
}

export interface CategoryStat {
  name: string;
  totalPosts: number;
}

export interface BrowserStat {
  name: string;
  totalUsers: number;
}

export interface StatsProps {
  data: {
    name: string;
    ideas: number;
  }[];
}

export interface PopularIdea {
  title: string;
  department: string;
  votes: number;
  views: number;
  date: string;
}

export interface PopularIdeaProps {
  popularIdeas: PopularIdea[];
}
