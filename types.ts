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
    jobTitle: string,
    posterID: string;
    summary: string;
    salary: PriceRange;
    status: "hiring" | "filled" | "capacity";
    skills: string[] | null;
    minimum: string[] | null;
    workEnvironment: string | null;
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