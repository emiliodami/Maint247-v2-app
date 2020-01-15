export interface InterfaceFinance{
  id: number;
  contract_id: string;
  datepaid: string;
  valuepaid: string;
  latefee: string;
  paypalfee: string;
  unit_id: string;
  landlord: string; 
  tenant: string;
  paypalid: string;
}

/*
CREATE TABLE `finance` (
  `id` int(11) NOT NULL,
  `contract_id` int(10) DEFAULT NULL,
  `datepaid` date DEFAULT NULL,
  `valuepaid` decimal(10,0) DEFAULT NULL,
  `latefees` decimal(10,0) DEFAULT NULL,
  `payplafees` decimal(10,0) DEFAULT NULL,
  `unit_id` int(10) DEFAULT NULL,
  `landlord` int(10) DEFAULT NULL,
  `tenant` int(10) DEFAULT NULL,
  `paypalid` varchar(100) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
COMMIT;
*/