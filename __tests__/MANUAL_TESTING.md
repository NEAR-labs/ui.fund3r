# Manual testing

> A guide to not forget to test anything.

## Testing list

- [ ] Should authenticate with NEAR wallet when clicking on the call to actions
- [ ] Should disconnect from NEAR when clicking logout in the navbar
- [ ] The /grants page should require NEAR login
- [ ] Saving as draft the form should not verify field types
- [ ] Saving as draft should display last saved time
- [ ] Submitting the form should requires field validation
- [ ] Submitting should first save as draft, then validate and submit to mark the data as submitted, then redirect to the NEAR submission
- [ ] If submission to the blockchain not completed show button to finish
- [ ] Submission to the blockchain should create a proposal to the DAO
- [ ] If submission to the blockchain and to the backend we should see the details

## API Implementation informations

- Check `__tests__/mocks/handlers.ts` to see how the API should behave
