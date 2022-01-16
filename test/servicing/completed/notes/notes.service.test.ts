import { Test, TestingModule } from "@nestjs/testing";
import faker from "faker";

import { Note } from "../../../../src/v2/modules/cases/completed/notes/note.interface";
import {
  NotesRepositoryInterface,
  NotesService,
} from "../../../../src/v2/modules/cases/completed/notes/notes.service";
import { CompletedIdentificationService } from "../../../../src/v2/modules/cases/completed/completed-identification.service";
import { InMemoryRepository } from "../utils/in-memory-repository";

describe("NotesService", () => {
  let service: NotesService;

  const CompletedId = 10;
  const completedServiceStub = {
    getIdByCaseUuid: jest.fn(() => CompletedId),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        NotesService,
        {
          provide: NotesRepositoryInterface,
          useFactory: () => new InMemoryRepository<Note>(),
        },
        {
          provide: CompletedIdentificationService,
          useValue: completedServiceStub,
        },
      ],
    }).compile();

    service = module.get<NotesService>(NotesService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  it("Adds new note with correct completed id", async () => {
    const uuid = "uuid";
    const note: Note = { Text: faker.random.words(1000) };

    await service.createNote(uuid, note);

    const matchingNotes = await service.getNotes(uuid);

    expect(matchingNotes).toEqual([
      expect.objectContaining({ ...note, FkCompletedId: CompletedId }),
    ]);
  });
});
