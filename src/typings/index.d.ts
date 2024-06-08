interface AuditConf {
  name: string;
  version: string;
  category: string;
  weight: number;
  type: "ALL" | "H5" | "PC";
}

interface PageItem {
  page_id?: number;
  isPc: boolean;
  title: string;
  url: string;
  toPerson: string;
  ssimThreshold: number;
  paramFlag: number;
  paramKey?: string;
  dyncparamsList: {
    key: string;
    values: {
      isNew: boolean;
      key: string;
      val: string;
    }[]
  }[];
  audits: AuditConf[]
}

interface RunnerProps {
  pageItem: PageItem, 
  browser: any, 
  map: any, 
  resultMap: any,
  param: string
}

interface NoticeConf {
  content: string;
  key: string;
  Fpage_id: number;
  duration: number;
}

interface RunnerResponse {
  data: any
}

// 异常文件类型
interface AbnormalFileItem {
  status: number;
  url: string;
}


interface LargeFileItem {
  size: number;
  type: string;
  url: string;
}