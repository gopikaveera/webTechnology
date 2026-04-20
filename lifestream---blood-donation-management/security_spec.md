# Security Specification for LifeStream

## Data Invariants
- A User profile must be owned by the authenticated user.
- A BloodRequest must have a valid requesterId matching the authenticated user.
- Users cannot modify other users' profiles.
- Only the requester can delete or update their BloodRequest (except status changes by potential admins if applicable).
- All timestamps must be server-generated.

## The "Dirty Dozen" Payloads (Deny List)
1. **Identity Spoofing**: Creating a profile with a `userId` different from `request.auth.uid`.
2. **Profile Hijacking**: Updating another user's profile.
3. **Cross-Requester Forgery**: Creating a `BloodRequest` with a `requesterId` different from `request.auth.uid`.
4. **Status Faking**: Updating a `BloodRequest` to "Fulfilled" by someone who didn't create it.
5. **Junk ID Poisoning**: Using a 2KB string as a `requestId`.
6. **Negative Units**: Setting `unitsNeeded` to -5.
7. **Future Timestamps**: Setting `createdAt` to a future date manually.
8. **Email Spoofing**: Using an unverified email in the profile if required.
9. **Role Escalation**: Trying to inject an `isAdmin: true` field into a user profile.
10. **Orphaned Request**: Creating a request with a non-existent requesterId (relational check).
11. **Massive Payload**: Sending a 1MB string in the `reason` field.
12. **State Shortcutting**: Updating a "Fulfilled" request back to "Open" (terminal state locking).

## Test Runner
Testing will be performed via the Firebase emulator or production rules analysis.
