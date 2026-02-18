export type PriceRange = {
    min: number;
    max: number;
}

export interface Address {
    street: string;
    city: string;
    state: string;
    zipCode: string;
}

export interface JobListing {
    id: string;
    posterID: string;
    summary: string;
    salary: PriceRange
    skills?: string[];
    minimum?: string[];
    workEnvironment?: string;
    company: string;
    location: Address;
}

export interface Resume {
    id: number;
    userId: string;
    jobId: string;
    resumeKey: string;
    createdAt: Date;
}