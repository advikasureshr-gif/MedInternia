import { Request, Response } from "express";
import {
    getCertificateById,
    verifyCertificate,
    exportCertificateData,
} from "../certificateController";

import Certificate from "../../models/Certificate";

jest.mock("../../models/Certificate");

const mockedCertificate = Certificate as jest.Mocked<typeof Certificate>;

const mockResponse = () => {
    const res: Partial<Response> = {};

    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);

    return res as Response;
};

describe("Certificate Controller", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe("getCertificateById", () => {
        it("should return 404 when certificate is not found", async () => {
            const populate2 = jest.fn().mockResolvedValue(null);

            const populate1 = jest.fn().mockReturnValue({
                populate: populate2,
            });

            (mockedCertificate.findOne as jest.Mock).mockReturnValue({
                populate: populate1,
            });

            const req = {
                params: { certificateId: "CERT-123" },
            } as unknown as Request;

            const res = mockResponse();

            await getCertificateById(req, res);

            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.json).toHaveBeenCalledWith(
                expect.objectContaining({
                    success: false,
                    message: "Certificate not found",
                })
            );
        });
    });

    describe("verifyCertificate", () => {
        it("should return invalid verification response when certificate does not exist", async () => {
            (mockedCertificate.findOne as jest.Mock).mockReturnValue({
                populate: jest.fn().mockResolvedValue(null),
            });

            const req = {
                body: {
                    certificateId: "CERT-123",
                    verificationHash: "invalid",
                },
            } as Request;

            const res = mockResponse();

            await verifyCertificate(req, res);

            expect(res.json).toHaveBeenCalledWith(
                expect.objectContaining({
                    success: false,
                    data: {
                        isValid: false,
                    },
                })
            );
        });
    });

    describe("exportCertificateData", () => {
        it("should return 404 when certificate is not found", async () => {
            const populateDoctor = jest.fn().mockResolvedValue(null);

            const populateMock = jest.fn();

            populateMock
                .mockReturnValueOnce({
                    populate: populateMock,
                })
                .mockResolvedValueOnce(null);

            (mockedCertificate.findOne as jest.Mock).mockReturnValue({
                populate: populateMock,
            });


            const req = {
                params: {
                    certificateId: "CERT-123",
                },
            } as unknown as Request;

            const res = mockResponse();

            await exportCertificateData(req, res);

            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.json).toHaveBeenCalledWith(
                expect.objectContaining({
                    success: false,
                })
            );
        });
    });
});